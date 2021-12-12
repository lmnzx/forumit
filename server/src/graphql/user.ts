import {
  Ctx,
  Field,
  InputType,
  Arg,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { Context } from "../types/context";
import { User } from "@generated/type-graphql/models";

@InputType()
class UserInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  name: string;
}

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users(@Ctx() { prisma }: Context): Promise<User[]> {
    return await prisma.user.findMany();
  }

  @Mutation(() => User)
  async createUser(
    @Ctx() { prisma }: Context,
    @Arg("userInput") { email, password, name }: UserInput
  ): Promise<User> {
    return await prisma.user.create({
      data: {
        email,
        password,
        name,
      },
    });
  }
}
