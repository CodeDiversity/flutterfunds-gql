import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.model';
import { UserService } from './user.service';
import { UserInput } from './user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Query(() => User)
  async user(@Args('email') email: string): Promise<User> {
    return this.userService.findOneByEmail(email);
  }

  @Mutation(() => User)
  async createUser(@Args('input') input: UserInput): Promise<User> {
    // create new user object
    let user = new User();
    user = { ...input };
    // save user object in database
    return this.userService.createUser(user);
  }
}
