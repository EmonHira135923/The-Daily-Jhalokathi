const NewsDetailsSkeleton = () => {
  return (
    <div className="bg-base-100 min-h-screen animate-pulse pb-20">
      <div className="container mx-auto px-4 pt-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-[3fr_1fr] gap-10">
            
            {/* Left Content Skeleton */}
            <article className="space-y-8">
              <div className="space-y-4">
                {/* Category Badge */}
                <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
                {/* Title */}
                <div className="h-10 md:h-14 bg-gray-200 rounded-xl w-full"></div>
                <div className="h-10 md:h-14 bg-gray-200 rounded-xl w-3/4"></div>

                {/* Author & Date info */}
                <div className="flex justify-between items-center border-y border-gray-100 py-6">
                  <div className="flex gap-6">
                    <div className="h-4 w-32 bg-gray-200 rounded"></div>
                    <div className="h-4 w-32 bg-gray-200 rounded"></div>
                  </div>
                  <div className="h-8 w-24 bg-gray-200 rounded-full"></div>
                </div>
              </div>

              {/* Main Image */}
              <div className="aspect-video w-full bg-gray-200 rounded-3xl"></div>

              {/* Content Paragraphs */}
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              </div>

              {/* Comment Box Skeleton */}
              <div className="rounded-3xl border border-gray-100 bg-gray-50/50 p-6 space-y-4">
                <div className="h-6 w-40 bg-gray-200 rounded"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="h-12 bg-gray-200 rounded-2xl"></div>
                  <div className="h-12 bg-gray-200 rounded-2xl"></div>
                </div>
                <div className="h-32 bg-gray-200 rounded-3xl"></div>
                <div className="h-12 w-32 bg-gray-200 rounded-full"></div>
              </div>
            </article>

            {/* Right Sidebar Skeleton */}
            <aside className="space-y-8">
              <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="h-6 w-32 bg-gray-200 rounded mb-6"></div>
                <div className="space-y-5">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex gap-4">
                      <div className="h-20 w-24 bg-gray-200 rounded-xl shrink-0"></div>
                      <div className="flex-1 space-y-2 py-1">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                        <div className="h-3 bg-gray-100 rounded w-1/3 mt-2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="h-6 w-20 bg-gray-200 rounded mb-4"></div>
                <div className="flex flex-wrap gap-2">
                  <div className="h-8 w-16 bg-gray-100 rounded-full"></div>
                  <div className="h-8 w-20 bg-gray-100 rounded-full"></div>
                  <div className="h-8 w-14 bg-gray-100 rounded-full"></div>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailsSkeleton;