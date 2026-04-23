import bcrypt from "bcrypt";

export class BCrypter {
  private static readonly saltRounds = 10;

  public static async hash(plainText: string): Promise<string> {
    if (!plainText) {
      throw new Error("Password is required");
    }

    return await bcrypt.hash(plainText, this.saltRounds);
  }

  public static async compare(
    plainText: string,
    hashed: string
  ): Promise<boolean> {     
    if (!plainText || !hashed) {
      throw new Error("Invalid parameters for password comparison");
    }

    return await bcrypt.compare(plainText, hashed);
  }
}