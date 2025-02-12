import { Entity, Post, StorableEntity } from '@backend/shared/core';
import { PostState, PostType } from '@prisma/client';

export class BlogPostEntity extends Entity implements StorableEntity<Post> {
  public postType!: PostType;
  public userId!: string;
  public isRepost!: boolean;
  public originUserId?: string;
  public originPostId?: string;
  public state!: PostState;
  public createdAt!: Date;
  public publicDate!: Date;

  constructor(post?: Post) {
    super();
    this.populate(post);
  }
  public populate(post?: Post): void {
    if (!post) {
      return;
    }
    const {
      id,
      postType,
      userId,
      isRepost,
      originUserId,
      originPostId,
      state,
      createdAt,
      publicDate,
    } = post;

    this.id = id ?? undefined;
    this.postType = postType;
    this.userId = userId;
    this.isRepost = isRepost;
    this.originUserId = originUserId ?? undefined;
    this.originPostId = originPostId ?? undefined;
    this.state = state;
    this.createdAt = createdAt;
    this.publicDate = publicDate;
  }

  toPOJO(): Post {
    return {
      id: this.id,
      postType: this.postType,
      userId: this.userId,
      isRepost: this.isRepost,
      originUserId: this.originUserId ?? undefined,
      originPostId: this.originPostId ?? undefined,
      state: this.state,
      createdAt: this.createdAt,
      publicDate: this.publicDate,
    };
  }
}
