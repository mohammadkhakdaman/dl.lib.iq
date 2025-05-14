export default function Search() {
    return <>
        <div>
            <div className="w-full flex justify-center py-1 mb-4">
                <div className="relative w-full">
                    <input
                    className="w-full backdrop-blur-sm bg-white/20 py-2 pl-10 pr-4 rounded-md focus:outline-none border-2 border-gray-100 focus:border-violet-300 transition-colors duration-300"
                    placeholder="Search..." type="text" />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                        className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"></path>
                    </svg>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
                <div
                    className="backdrop-blur-sm bg-white/20 p-6 rounded-md shadow-sm cursor-pointer border-2 border-gray-50 hover:border-violet-200 hover:border-2 transition-colors duration-300">
                    <h2 className="text-xl font-semibold mb-4">Project 1</h2>
                    <p className="text-gray-700">Description of Project 2 goes here. You can provide more details about the
                        project.</p>
                </div>
            </div>
        </div>
    </>
}