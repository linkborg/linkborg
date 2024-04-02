import Navigation from "@/components/navigation";

async function AuthLayout({ children }: { children: any }) {
    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className={"hidden md:block md:min-h-screen"}><Navigation /></div>
            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                {children}
            </main>
        </div>
    )
}

export default AuthLayout;