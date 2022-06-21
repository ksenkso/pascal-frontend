import { Task } from '~/api/tasks';
import { TaskSet } from '~/api/taskSets';

export const bem = (baseClass: string, mods: Record<string, string | string[] | boolean>) => {
  const keys = Object.keys(mods);
  const res: string[] = [];

  keys.forEach((key) => {
    const param = mods[key];
    if (!param) return;

    if (Array.isArray(param)) {
      param.forEach((item) => {
        res.push(`${baseClass}_${key}-${item}`);
      });
    } else {
      const mod = typeof param === 'boolean' ? key : `${key}-${param}`;
      res.push(`${baseClass}_${mod}`);
    }
  });
  return [baseClass, res];
};

function fallbackCopyTextToClipboard(text: string) {
  const textArea = document.createElement('textarea');
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand('copy');
    const msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}
export async function copyTextToClipboard(text: string) {
  if (!navigator.clipboard) {
    return fallbackCopyTextToClipboard(text);
  }
  return navigator.clipboard.writeText(text);
}

const cases = [2, 0, 1, 1, 1, 2];
export function pluralize(count: number, one: string, two: string, many: string) {
  const titles = [one, two, many];

  return titles[(count % 100 > 4 && count % 100 < 20) ? 2 : cases[(count % 10 < 5) ? count % 10 : 5]];
}


export const formatTime = (time: number) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time - hours * 3600) / 60);
  const seconds = time % 60;

  return [
    hours,
    minutes,
    seconds
  ]
    .map(t => t.toString().padStart(2, '0'))
    .join(':');
}

const COMPLETED_TASKS = 'COMPLETED_TASKS';

export const completeTask = (task: Task) => {
  let source = localStorage.getItem(COMPLETED_TASKS);
  if (!source) {
    source = '{}';
  }
  const tasks = JSON.parse(source) as Record<string, string[]>;
  if (tasks[task.taskSet._id]) {
    tasks[task.taskSet._id].push(task._id);
  } else {
    tasks[task.taskSet._id] = [task._id];
  }

  localStorage.setItem(COMPLETED_TASKS, JSON.stringify(tasks));
}

export const getCompletedTasks = (taskSet: TaskSet) => {
  let source = localStorage.getItem(COMPLETED_TASKS);
  if (!source) {
    source = '{}';
  }
  const tasks = JSON.parse(source) as Record<string, string[]>;

  return tasks[taskSet._id] || [];
}
