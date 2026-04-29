import amqp from 'amqplib';
import { inject, injectable } from 'tsyringe';
import { ILikeService } from '../interface/ILikeService';

type LikeMessage = {
  type: 'LIKE' | 'DESLIKE';
  data: {
    postId: number;
    autorId: number;
  };
};

@injectable()
export class LikeConsumer {

  constructor(
    @inject("ILikeService")
    private likeService: ILikeService
  ) {}

  private readonly queue = 'likes_queue';

  async start() {
    const connection = await amqp.connect(process.env.RABBITMQ_URL || "amqp://localhost");
    const channel = await connection.createChannel();

    await channel.assertQueue(this.queue, { durable: true });

    channel.consume(this.queue, async (msg) => {
      if (!msg) return;

      try {
        const message: LikeMessage = JSON.parse(msg.content.toString());

        const { type, data } = message;

        if (!data?.postId || !data?.autorId) {
          throw new Error('Mensagem inválida');
        }

        if (type === 'LIKE') {
          await this.likeService.like(data.autorId, data.postId);
        }

        if (type === 'DESLIKE') {
          await this.likeService.deslike(data.autorId, data.postId);
        }

        channel.ack(msg);

      } catch (error: any) {

        if (error.code === '23505') {
          channel.ack(msg);
          return;
        }

        channel.nack(msg, false, false);
      }

    });
  }
}