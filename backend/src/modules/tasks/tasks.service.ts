import { AppDataSource } from "../../config/data-source";
import { Task, type TaskStatus } from "../../entities/Task";
import { User } from "../../entities/User";

const taskRepository = AppDataSource.getRepository(Task);
const userRepository = AppDataSource.getRepository(User);

type CreateTaskInput = {
  title: string;
  description?: string;
  userId: string;
};

type UpdateTaskInput = {
  taskId: number;
  userId: string;
  title?: string;
  description?: string;
  status?: TaskStatus;
};

function formatTask(task: Task) {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    status: task.status,
    lastEditedAt: task.lastEditedAt.toISOString(),
  };
}

export async function listTasks(userId: string) {
  const tasks = await taskRepository.find({
    where: {
      user: {
        id: userId,
      },
    },
    order: {
      lastEditedAt: "DESC",
    },
  });

  return tasks.map(formatTask);
}

export async function createTask(data: CreateTaskInput) {
  const user = await userRepository.findOne({
    where: {
      id: data.userId,
    },
  });

  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  const task = taskRepository.create({
    title: data.title,
    description: data.description || "",
    status: "todo",
    user,
  });

  await taskRepository.save(task);

  return formatTask(task);
}

export async function updateTask(data: UpdateTaskInput) {
  const task = await taskRepository.findOne({
    where: {
      id: data.taskId,
      user: {
        id: data.userId,
      },
    },
  });

  if (!task) {
    throw new Error("Task não encontrada.");
  }

  if (data.title !== undefined) {
    task.title = data.title;
  }

  if (data.description !== undefined) {
    task.description = data.description;
  }

  if (data.status !== undefined) {
    task.status = data.status;
  }

  await taskRepository.save(task);

  return formatTask(task);
}

export async function deleteTask(taskId: number, userId: string) {
  const task = await taskRepository.findOne({
    where: {
      id: taskId,
      user: {
        id: userId,
      },
    },
  });

  if (!task) {
    throw new Error("Task não encontrada.");
  }

  await taskRepository.remove(task);
}