export default function CardListContainer({ children, display }) {
    return display == 'grid' ? <>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-5 w-full">
            {children}
        </div>
    </>
        :
        <div className="flex flex-col justify-stretch p-2 gap-5">
            {children}
        </div>
}