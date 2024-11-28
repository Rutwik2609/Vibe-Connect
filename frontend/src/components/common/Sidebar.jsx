import XSvg from "../svgs/X";

import { MdHomeFilled } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { MdSunny } from "react-icons/md";
import { IoMdMoon } from "react-icons/io";
import { useQueryClient, useMutation, useQuery,  } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";


const Sidebar = () => {
	const { data } = useQuery({ queryKey: ["authUser"] })

	// State to manage theme
	const [theme, setTheme] = useState('light');

	// Update the theme on state change
	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme);
	}, [theme]);

	// Toggle theme between light and dark
	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === 'light' ? 'black' : 'light'));
	};


	const queryClient = useQueryClient();

	const { mutate: Logout } = useMutation({
		mutationFn: async () => {
			try {
				const res = await fetch("/api/auth/logout", {
					method: "POST"
				})

				const data = await res.json();
				if (!res.ok) throw new Error(data.error || "😞 Something went wrong !")
			} catch (error) {
				console.log(error)
				throw new Error(error);
			}
		},
		onSuccess: () => {
			toast.success("Logout Successful !")
			queryClient.invalidateQueries({ queryKey: ["authUser"] })
		},
		onError: () => {
			toast.error("Logout Failed")
		}
	})
	return (
		<div className='md:flex-[2_2_0] w-18 max-w-52 '>
			<div className='sticky top-0 left-0 h-screen flex flex-col border-r border-gray-700 w-20 md:w-full'>
				<Link to='/' className='flex justify-center md:justify-start'>
					{theme==="black" && <XSvg className='px-2 w-14 h-12 rounded-full fill-white hover:bg-stone-900' />}
					{theme==="light" && <XSvg className='px-2 w-14 h-12 rounded-full  hover:bg-primary' />}
				</Link>
				<ul className='flex flex-col gap-3 mt-4'>
					<li className=' flex justify-center md:justify-start'>
						<Link
							to='/'
							className=' flex gap-3 items-center hover:bg-primary transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit hover:text-white cursor-pointer'
						>
							<MdHomeFilled className='w-8 h-8' />
							<span className='text-lg hidden md:block'>Home</span>
						</Link>
					</li>
					<li className=' flex justify-center md:justify-start'>
						<Link
							to='/notifications'
							className=' flex gap-3 items-center hover:bg-primary transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit hover:text-white cursor-pointer'
						>
							<IoNotifications className='w-6 h-6' />
							<span className='text-lg hidden md:block'>Notifications</span>
						</Link>
					</li>

					<li className=' flex justify-center md:justify-start'>
						<Link
							to={`/profile/${data?.username}`}
							className=' flex gap-3 items-center hover:bg-primary transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit hover:text-white cursor-pointer'
						>
							<FaUser className='w-6 h-6' />
							<span className='text-lg hidden md:block'>Profile</span>
						</Link>
					</li>

					<li className=' flex justify-center md:justify-start'>
						<button
						 	onClick={toggleTheme}
							className=' flex gap-3 items-center hover:bg-primary transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit hover:text-white cursor-pointer'
						>
							{theme==="black" && <MdSunny className='w-6 h-6 transition ease-in duration-200' />}
							{theme==="light" &&<IoMdMoon className='w-6 h-6 transition ease-in duration-200' />}
							<span className='text-lg hidden md:block'>Change Theme</span>
						</button>
					</li>
				</ul>
				{data && (
					<Link
						to={`/profile/${data.username}`}
						className='mt-auto mb-10 flex gap-2 items-start transition-all duration-300 hover:bg-primary hover:text-white  py-2 px-4 rounded-full'
					>
						<div className='avatar hidden md:inline-flex'>
							<div className='w-8 rounded-full'>
								<img src={data?.profileImg || "/avatar-placeholder.png"} />
							</div>
						</div>
						<div className='flex justify-between flex-1'>
							<div className='hidden md:block'>
								{theme==="black" &&<p className='text-white font-bold text-sm w-20 truncate'>{data?.fullName}</p>}
								{theme==="light" &&<p className='text-black hover:text-white font-bold text-sm w-20 truncate'>{data?.fullName}</p>}
								{theme==="black" &&<p className='text-slate-500 text-sm'>@{data?.username}</p>}
								{theme==="light" &&<p className='text-black hover:text-white text-sm'>@{data?.username}</p>}
							</div>
							<BiLogOut className='w-5 h-5 cursor-pointer'
								onClick={(e) => {
									e.preventDefault();
									Logout();

								}} />
						</div>
					</Link>
				)}
			</div>
		</div>
	);
};
export default Sidebar;
