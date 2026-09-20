import * as React from "react"
import { Review } from "@/lib/commerce/types"
import { Star, ShieldCheck } from "lucide-react"

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`Rated ${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={14}
          className={star <= rating ? "fill-bone text-bone" : "fill-transparent text-text-muted/40"}
        />
      ))}
    </div>
  )
}

export function Reviews({ reviews }: { reviews?: Review[] }) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="border-t border-line pt-8">
        <p className="text-mono-caption mb-5 text-text-muted">No reviews yet</p>
        <div className="flex items-start gap-4">
          <ShieldCheck
            size={20}
            strokeWidth={1.5}
            aria-hidden="true"
            className="mt-0.5 shrink-0 text-text-muted"
          />
          <div>
            <h3 className="text-h3 text-bone">Thirty days to decide instead.</h3>
            <p className="measure mt-3 text-body text-text-secondary">
              We do not publish reviews we did not receive, and there are none
              yet. Use it for thirty days; if it is not for you, send it back
              for a full refund.
            </p>
          </div>
        </div>
      </div>
    )
  }

  const totalReviews = reviews.length
  const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
  
  const distribution = [5, 4, 3, 2, 1].map(star => {
    const count = reviews.filter(r => r.rating === star).length
    return { star, count, percentage: (count / totalReviews) * 100 }
  })

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row gap-12 items-start">
        {/* Summary */}
        <div className="w-full md:w-1/3 space-y-4">
          <h2 className="text-display leading-none">{averageRating.toFixed(1)}</h2>
          <StarRating rating={Math.round(averageRating)} />
          <p className="text-mono-caption text-text-muted">Based on {totalReviews} reviews</p>
        </div>
        
        {/* Distribution */}
        <div className="w-full md:w-2/3 space-y-3">
          {distribution.map(({ star, count, percentage }) => (
            <div key={star} className="flex items-center gap-4 text-mono-caption">
              <span className="w-4">{star}</span>
              <Star size={12} className="fill-midnight" />
              <div className="flex-1 h-2 bg-ink-raised relative overflow-hidden">
                <div 
                  className="absolute inset-y-0 left-0 bg-ink-raised transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="w-8 text-right text-text-muted">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Review List */}
      <div className="space-y-8 pt-8 border-t border-line">
        {reviews.map((review) => (
          <div key={review.id} className="space-y-4 pb-8 border-b border-line last:border-0 last:pb-0">
            <div className="flex items-center justify-between">
              <StarRating rating={review.rating} />
              <span className="text-mono-caption text-text-muted">{new Date(review.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div>
              <p className="text-body font-medium">{review.author}</p>
              {review.verifiedBuyer && <span className="text-mono-caption text-text-muted">Verified Buyer</span>}
            </div>
            <p className="text-body text-text-secondary leading-relaxed">{review.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
