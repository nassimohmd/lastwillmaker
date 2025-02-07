import type { InsertAnswer, Answer } from "@shared/schema";

export interface IStorage {
  createAnswer(answer: InsertAnswer): Promise<Answer>;
}

export class MemStorage implements IStorage {
  private answers: Map<number, Answer>;
  private currentId: number;

  constructor() {
    this.answers = new Map();
    this.currentId = 1;
  }

  async createAnswer(insertAnswer: InsertAnswer): Promise<Answer> {
    const id = this.currentId++;
    const answer: Answer = { id, ...insertAnswer };
    this.answers.set(id, answer);
    return answer;
  }
}

export const storage = new MemStorage();
