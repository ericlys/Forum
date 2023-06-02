import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  public itens: AnswerComment[] = []

  async create(answerComment: AnswerComment) {
    this.itens.push(answerComment)
  }
}
