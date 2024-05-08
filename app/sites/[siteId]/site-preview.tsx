'use client'

import React from "react";

export function SitePreview({initData}: { initData: any }) {

	return (
		<div className={"border-4 border-gray-700 rounded-xl bg-black max-w-[340px] min-w-[340px] min-h-[600px] max-h-[900px]"}>
			<div
				className="banner rounded-l h-[150px]"
				style={{
					backgroundImage: `url(${initData.image || "https://linkborgcdn.xpri.dev/cover/cc806756-06f6-424d-ab9c-8d484682f247.jpeg"})`,
				}}
			>
				&nbsp;
			</div>
			<div className="text-center mb-8 -mt-16">
				<img
					src={initData.logo || "https://linkborgcdn.xpri.dev/linkborg/favicon.png"}
					alt="Avatar"
					className="rounded-full bg-blue-500 w-32 h-32 mx-auto mb-4 m-2"
				/>
				<h1 className="text-2xl font-bold mt-4 text-white">{initData.name}</h1>
				<p className="text-white ">
					{initData.description || ""}
				</p>
				{/* Social media icons */}
			</div>
			{initData.links
				.filter((block: { hidden: any; }) => !block.hidden)
				.sort((a: { order: number; }, b: { order: number; }) => a.order - b.order)
				.map((block: { description: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; slug: any; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }, index: React.Key | null | undefined) => (
					<div key={index} className="bg-gray-800 rounded-lg p-4 mx-4 mt-4 link">
						<div className="flex justify-between items-center mb-2">
							<i className="fas fa-link text-gray-400"></i>
							<span className="text-gray-400 text-sm">{block.description}</span>
						</div>
						<a
							href={`/${block.slug}`}
							className="block bg-gray-700 rounded-lg p-4 text-white hover:bg-gray-600 transition-colors duration-300"
						>
							{block.title}
						</a>
					</div>
				))}
			<p className="text-gray-400 mt-8 mb-4 text-center">© linkborg</p>
		</div>
	);
}