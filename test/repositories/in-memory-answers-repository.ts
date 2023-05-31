import { AnswerRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswerRepository {
  public itens: Answer[] = []

  async create(answer: Answer) {
    this.itens.push(answer)
  }
}
