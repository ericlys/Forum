import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
  public itens: Answer[] = []

  async findById(id: string) {
    const answer = this.itens.find((question) => question.id.toString() === id)

    return answer ?? null
  }

  async create(answer: Answer) {
    this.itens.push(answer)
  }

  async save(answer: Answer) {
    const itemIndex = this.itens.findIndex((item) => item.id === answer.id)

    this.itens[itemIndex] = answer
  }

  async delete(answer: Answer) {
    const itemIndex = this.itens.findIndex((item) => item.id === answer.id)

    this.itens.splice(itemIndex, 1)
  }
}
