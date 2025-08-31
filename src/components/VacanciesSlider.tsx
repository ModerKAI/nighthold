"use client";
import JobCard, { type Job } from "@/components/JobCard";

type Props = { jobs: Job[] };

export default function VacanciesSlider({ jobs }: Props) {
  return (
    <div className="relative h-screen overflow-hidden">
      <div className="absolute inset-0 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-none">
        <div className="h-full flex">
          {jobs.map((job, i) => (
            <div key={job.title} className="snap-start w-screen h-full p-6 md:p-10 flex items-center justify-center">
              <div className="max-w-3xl w-full">
                <JobCard job={job} i={i} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
