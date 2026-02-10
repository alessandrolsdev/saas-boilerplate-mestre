/**
 * SkeletonCard Component - Loading placeholder
 */
export default function SkeletonCard({ count = 1, height = 'h-32' }) {
    return (
        <>
            {[...Array(count)].map((_, i) => (
                <div key={i} className={`bg-white rounded-2xl border-2 border-gray-100 p-6 ${height} animate-pulse`}>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                        <div className="flex-1">
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="h-3 bg-gray-200 rounded w-full"></div>
                        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                    </div>
                </div>
            ))}
        </>
    );
}
