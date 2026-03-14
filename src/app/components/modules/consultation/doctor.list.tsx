"use client"

import { getdoctor } from "@/app/commonlayout/consultaion/_actions"
import { useQuery } from "@tanstack/react-query"
import type { Doctor } from "@/types/doctor"

const Doctorlist = () => {
  const { data } = useQuery<Doctor[]>({
    queryKey: ['doctors'],
    queryFn: () => getdoctor(),
  });
  console.log(data);

  return (
    <div>
      <h1>Doctor List</h1>
      <div>
        {Array.isArray(data) && data.map((item) => (
          <div key={item.id}>
            <h3>{item.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Doctorlist;