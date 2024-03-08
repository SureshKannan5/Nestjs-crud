export interface Tasks extends Document {
  title: string;
  description: string;
  status: ['TODO', 'IN_PROGRESS', 'DONE'];
}

export interface FilteredTasks {
  data: Tasks[];
  totalTasks: number;
}
