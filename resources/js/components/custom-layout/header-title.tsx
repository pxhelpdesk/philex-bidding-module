export default function HeaderTitle({ title, description }: { title: string; description?: string;}) {
    return (
         <header className="px-3 py-2 ">
            <h3 className="text-2xl font-bold uppercase">{title}</h3>
            <p className="text-sm text-slate-500">{description}</p>
        </header>
    );
}
