export type Job = {
  company: string;
  employee: string | null;
  job_id: string;
  job_name: string;
  is_new: boolean
};

export type Batch = {
  batch_id: string;
  job_location: string;
  keywords: string;
  last_updated: string;
};
