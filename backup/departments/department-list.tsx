// import type { Department } from "@/lib/types/departments";
// import Link from "next/link";
// import { getDepartmentContent } from "@/services/department.service";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
// import {
//   faRobot,
//   faFunnelDollar,
//   faBellConcierge,
//   faFileInvoiceDollar,
//   faUsersBetweenLines,
//   faShieldHalved,
//   faCalculator,
// } from "@fortawesome/free-solid-svg-icons";

// const departmentColors: Record<string, string> = {
//   accounting: "bg-brand-blue",
//   "customer-service": "bg-brand-teal-blue",
//   "human-resources": "bg-brand-ocean-blue",
//   "marketing": "bg-brand-teak",
//   "operations": "bg-brand-salsa-red",
//   "sales": "bg-brand-deep-ocean-blue",
// };

// const departmentIcons: Record<string, IconDefinition> = {
//   accounting: faFileInvoiceDollar,
//   "customer-service": faBellConcierge,
//   "human-resources": faUsersBetweenLines,
//   marketing: faFunnelDollar,
//   operations: faRobot,
//   sales: faShieldHalved,
//   "finance": faCalculator,
// };

// export async function DepartmentList(): Promise<React.JSX.Element> {
//   const departments = await getDepartmentContent();

//   return (
//     <section className="w-full min-h-screen bg-[#fcdfdf] py-5">
//       <div className="grid grid-cols-1 container">
//         <h2 className="text-black lg:text-7xl xl:text-[6.5rem] leading-[0.95] font-black font-[var(--font-sora)] shadow-text">
//           AI Use
//           <br />
//           <span className="text-[#8C2703] shadow-text">Cases</span>
//         </h2>
//       </div>
//       {departments.map((department: Department, index: number) => (
//         <div key={department.id} className="grid grid-cols-3 gap-4 container">
//           {index % 2 === 0 ? (
//             <>
//               <div
//                 className={`col-span-1 flex flex-col items-center justify-center py-5 ${departmentColors[department.slug] ?? "bg-gray-900"}`}
//               >
//                 <FontAwesomeIcon
//                   icon={departmentIcons[department.slug] ?? faRobot}
//                   width={128}
//                   height={128}
//                   className="text-white mb-4"
//                 />
//                 <h3 className="text-white font-bold xl:text-5xl shadow-text">
//                   {department.name}
//                 </h3>
//               </div>
//               <div className="col-span-2 border-y px-5 py-5">
//                 {department.useCases.map((useCase) => (
//                   <div key={useCase.id}>
//                     <h4 className="text-3xl text-black font-bold shadow-text">
//                       {useCase.descriptiveName}
//                     </h4>
//                     <p className="text-xl text-black shadow-text">{useCase.summary}</p>
//                     <h5 className="text-black font-bold text-lg shadow-text">
//                         Detailed Research:
//                     </h5>
//                     <Link
//                       href={`/case-studies/${useCase.caseStudy.slug}`}
//                       className="text-blue-600 hover:text-blue-800 underline shadow-text">
//                         {useCase.caseStudy.descriptiveName}
//                     </Link>
//                   </div>
//                 ))}
//               </div>
//             </>
//           ) : (
//             <>
//               <div className="col-span-2 border-y py-5">
//                 {department.useCases.map((useCase) => (
//                   <div key={useCase.id}>
//                     <h4 className="text-3xl text-black font-bold shadow-text">
//                       {useCase.descriptiveName}
//                     </h4>
//                     <p className="text-xl text-black shadow-text">{useCase.summary}</p>
//                     <h5 className="text-black font-bold text-lg shadow-text">
//                         Detailed Research:
//                     </h5>
//                     <Link
//                       href={`/case-studies/${useCase.caseStudy.slug}`}
//                       className="text-blue-600 hover:text-blue-800 shadow-text underline">
//                         {useCase.caseStudy.descriptiveName}
//                     </Link>
//                   </div>
//                 ))}
//               </div>
//               <div
//                 className={`col-span-1 flex flex-col items-center justify-center py-5 ${departmentColors[department.slug] ?? "bg-gray-900"}`}
//               >
//                 <FontAwesomeIcon
//                   icon={departmentIcons[department.slug] ?? faRobot}
//                   width={128}
//                   height={128}
//                   className="text-white mb-4"
//                 />
//                 <h3 className="text-white font-bold xl:text-5xl shadow-text">
//                   {department.name}
//                 </h3>
//               </div>
//             </>
//           )}
//         </div>
//       ))}
//     </section>
//   );
// }
