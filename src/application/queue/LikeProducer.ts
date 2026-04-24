import amqp from 'amqplib';

export class LikeProducer {
  private queue = 'likes_queue';

  private async send(message: any): Promise<void> {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertQueue(this.queue, { durable: true });

    channel.sendToQueue(
      this.queue,
      Buffer.from(JSON.stringify(message)),
      { persistent: true }
    );

    await channel.close();
    await connection.close();
  }

  async sendLike(data: { postId: number; autorId: number }) {
    await this.send({
      type: 'LIKE',
      data
    });
  }

  async sendDeslike(data: { postId: number; autorId: number }) {
    await this.send({
      type: 'DESLIKE',
      data
    });
  }
}