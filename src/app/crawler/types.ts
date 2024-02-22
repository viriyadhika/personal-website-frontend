export type Job = {
  company: string;
  employee: string | null;
  job_id: string;
};

export enum Status {
  QUEUING = 1,
  BATCH_RUNNING = 2,
  COMPLETED = 3,
}

export type Batch = {
  batch_id: string;
  status: Status;
};
