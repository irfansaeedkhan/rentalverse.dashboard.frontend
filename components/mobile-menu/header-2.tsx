// {
//   /* mobile */
// }
// <SidebarContext.Provider value={{ isOpen, setIsOpen: setIsOpen }}>
//   <div className={`overflow-x-hidden lg:overflow-visible`}>
//     <div
//       className={cn(
//         `absolute top-0 z-[2000] flex h-dvh w-full flex-shrink-0 flex-col justify-between bg-primary transition-all duration-300 ease-linear lg:hidden lg:w-[300px]`,
//         !toggle ? "left-[-110%]" : "left-[0%]",
//       )}
//     >
//       <button
//         type="button"
//         onClick={handleClose}
//         className="absolute right-6 top-6"
//       >
//         <FaTimes className="size-6 text-white" />
//       </button>
//       <div className="flex h-full flex-col justify-between">
//         <div className="flex flex-col">
//           <div className="flex items-center justify-center gap-4 px-6  pt-20">
//             <Link
//               href={AppRoutes.profile.my_profile}
//               className="flex flex-col items-center"
//             >
//               <Image
//                       src="/images/dummy-image.png"
//                       width={80}
//                       height={80}
//                       alt="profile"
//                       className="w-20 rounded-full"
//                     />
//               <FaCircleUser className="size-20 shrink-0 text-white" />
//               <h3 className="pt-4 text-xl font-semibold text-white">
//                 {`${profileData?.Name ?? ""} ${profileData?.Surname ?? ""}`}
//               </h3>
//               <span
//                 className={clsx(
//                   "flex-shrink-0 pt-1 text-sm font-medium",
//                   pathname === AppRoutes.profile.my_profile
//                     ? "border-b text-white"
//                     : "text-white",
//                 )}
//               >
//                 View Profile
//               </span>
//             </Link>
//           </div>

//           <hr className="mb-14 mt-9 h-[2px] border-0 bg-primary-light" />
//           <div className="flex flex-col items-center px-6  lg:items-start">
//             <div className="mx-auto flex w-full flex-col items-start justify-center gap-6 px-4">
//               {SidebarData.map((item) => (
//                 <Link
//                   href={item.link}
//                   key={item.link}
//                   className={clsx(
//                     "group flex w-full items-center justify-start gap-4",
//                   )}
//                   onClick={() => {
//                     setToggle(false);
//                   }}
//                 >
//                   <item.icon
//                     className={clsx(
//                       "size-6 flex-shrink-0",
//                       pathname === item.link ? "fill-green" : "fill-white",
//                     )}
//                   />
//                   <p
//                     className={clsx(
//                       "h-[1.063rem] flex-shrink-0 text-sm font-medium lg:block",
//                       pathname === item.link
//                         ? "text-green"
//                         : "lg:group-hover:cool-link-green text-white",
//                     )}
//                   >
//                     {item.title}
//                   </p>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </div>
//         <div className="mb-10 flex items-center justify-start  px-6">
//           <Button
//             title="logout"
//             className="mt-4 w-full text-sm md:text-base lg:!py-2"
//             onClick={logoutHandler}
//           />
//           <div className="mb-10">
//                   <label className="px-6 text-xs font-medium uppercase text-white/80">
//                     Action
//                   </label>
//                   <div
//                     onClick={logoutHandler}
//                     className="mt-4 flex cursor-pointer items-center gap-2 px-6 text-sm font-medium text-white"
//                   >
//                     <Logout
//                       className={clsx(
//                         "size-5 flex-shrink-0 stroke-gray-shade-1",
//                       )}
//                     />
//                     <span className="flex-shrink-0 text-sm font-medium lg:block">
//                       Log out
//                     </span>
//                   </div>
//                 </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </SidebarContext.Provider>;
