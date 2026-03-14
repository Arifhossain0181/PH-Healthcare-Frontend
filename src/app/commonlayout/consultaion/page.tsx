import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import React from "react";
import { getdoctor } from "./_actions";
import Doctorlist from "../../components/modules/consultation/doctor.list";
export default async function ConsultationDoctorPage() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['doctors'],
    queryFn: getdoctor,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Doctorlist />
    </HydrationBoundary>
  )
}