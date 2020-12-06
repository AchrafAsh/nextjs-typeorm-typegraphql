import {
    Resolver,
    Query,
    Mutation,
    Arg,
    InputType,
    Field,
    ID
} from 'type-graphql'
import { Comment } from '@models/comment.model'

@InputType()
export class CreateCommentInput {
    @Field(() => ID)
    postId: number

    @Field()
    body: string
}

@Resolver(Comment)
export class CommentResolver {
    @Query(() => [Comment])
    comments() {
        return Comment.find()
    }

    @Query(() => Comment)
    comment(@Arg('id') id: string) {
        return Comment.findOne({ where: { id } })
    }

    @Mutation(() => Comment)
    async createComment(@Arg('data') data: CreateCommentInput) {
        const comment = Comment.create(data)
        await comment.save()
        return comment
    }
}
