export interface Tasks extends Document {
  title: string;
  description: string;
  status: ['TODO', 'IN_PROGRESS', 'DONE'];
}
