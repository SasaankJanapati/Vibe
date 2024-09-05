import { getCurrentUser } from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { userId, isGroup, members, name } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (isGroup && (!members || members.length < 2 || !name)) {
      return new NextResponse("Inavalid Data", { status: 400 });
    }

    if (isGroup) {
      const newConversation = await prisma.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              ...members.map((member: { value: string }) => ({
                id: member.value,
              })),
              {
                id: currentUser.id,
              },
            ],
          },
        },
        include: {
          users: true,
        },
      });

      newConversation.users.forEach((user) => {
        if (user.email) {
          pusherServer.trigger(user.email, "conversation:new", newConversation);
        }
      });

      return NextResponse.json(newConversation);
    }

    const logger = async (res: any) => {
      console.log("isGroup: ", res?.isGroup);
    };

    const existingConversations = await prisma.conversation.findMany({
      where: {
        AND: [
          {
            userIds: {
              has: currentUser.id,
            },
          },
          {
            userIds: {
              has: userId,
            },
          },
        ],
      },
    });

    const singleConversation = existingConversations.find(
      (convo) => convo.userIds.length === 2
    );

    if (singleConversation) return NextResponse.json(singleConversation);
    else {
      const newConversation = await prisma.conversation.create({
        data: {
          users: {
            connect: [
              {
                id: currentUser.id,
              },
              {
                id: userId,
              },
            ],
          },
        },
        include: {
          users: true,
        },
      });

      newConversation.users.forEach((user) => {
        if (user.email) {
          pusherServer.trigger(user.email, "conversation:new", newConversation);
        }
      });

      return NextResponse.json(newConversation);
    }
  } catch (error: any) {
    console.log(error, "REGISTRATION_ERROR");
    return new NextResponse("Internal Error", { status: 500 });
  }
};
