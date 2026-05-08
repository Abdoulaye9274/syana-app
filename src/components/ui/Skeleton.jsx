const Skeleton = ({ className = '' }) => (
    <div className={`animate-pulse bg-bg-card-hover rounded-xl ${className}`} />
)

export const SkeletonStatCard = () => (
    <div className="bg-bg-card border border-border-primary rounded-2xl p-6 flex flex-col gap-4">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-3 w-2/3" />
    </div>
)

export const SkeletonModuleCard = () => (
    <div className="bg-bg-card border border-border-primary rounded-2xl overflow-hidden">
        <Skeleton className="h-40 rounded-none" />
        <div className="p-5 space-y-3">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
        </div>
    </div>
)

export const SkeletonDeliverableCard = () => (
    <div className="bg-bg-card border border-border-primary rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-4">
            <Skeleton className="w-12 h-12 rounded-xl shrink-0" />
            <div className="flex-1 space-y-2">
                <Skeleton className="h-3 w-1/4" />
                <Skeleton className="h-5 w-1/2" />
                <Skeleton className="h-3 w-1/3" />
            </div>
        </div>
    </div>
)

export const SkeletonProfileCard = () => (
    <div className="bg-bg-card border border-border-primary rounded-2xl p-8 space-y-6">
        <div className="flex items-center gap-4">
            <Skeleton className="w-16 h-16 rounded-full shrink-0" />
            <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-1/3" />
                <Skeleton className="h-4 w-1/2" />
            </div>
        </div>
        <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-2">
                    <Skeleton className="h-3 w-1/4" />
                    <Skeleton className="h-10 w-full" />
                </div>
            ))}
        </div>
    </div>
)

export default Skeleton
