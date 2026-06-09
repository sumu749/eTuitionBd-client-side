import { Star, Bookmark, BookmarkMinus } from "lucide-react";

const TutorCard = ({
    tutor,
    isBookmarked,
    onBookmark,
    showBookmark,
    userRole,
    user,
    onViewDetails,
    onMyProfile,
    onViewProfile,
    onMessage,
    onLoginToApply,
}) => {
    return (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden hover:shadow-lg transition-shadow">
            <figure className="relative">
                <img
                    src={
                        tutor.photoURL ||
                        tutor.image ||
                        "https://i.pravatar.cc/300?img=65"
                    }
                    alt={tutor.name}
                    className="w-full h-56 object-cover"
                />
                <div className="absolute top-2 right-2 bg-yellow-400 text-black px-2 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star size={16} />
                    4.9 Rating
                </div>
            </figure>

            <div className="p-5">
                <h2 className="font-bold text-xl text-slate-100">
                    {tutor.name}
                </h2>
                <p className="text-cyan-300">{tutor.subject}</p>
                <p className="text-slate-400 mt-1">{tutor.university}</p>

                <div className="mt-4 flex gap-2 flex-wrap">
                    {userRole === "student" ? (
                        <>
                            {showBookmark && (
                                <button
                                    type="button"
                                    onClick={() => onBookmark(tutor)}
                                    className={`btn btn-outline btn-sm rounded-full ${
                                        isBookmarked ? "btn-success" : ""
                                    }`}
                                >
                                    {isBookmarked ? (
                                        <>
                                            <BookmarkMinus size={16} />
                                            Saved
                                        </>
                                    ) : (
                                        <>
                                            <Bookmark size={16} />
                                            Save
                                        </>
                                    )}
                                </button>
                            )}
                            <button
                                onClick={() => onViewDetails(tutor)}
                                className="btn btn-primary btn-sm rounded-full"
                            >
                                View Details
                            </button>
                        </>
                    ) : userRole === "tutor" ? (
                        <>
                            <button
                                className="btn btn-primary rounded-full flex-1"
                                onClick={() => onMyProfile()}
                            >
                                My Profile
                            </button>
                            <button
                                className="btn btn-outline btn-sm rounded-full"
                                onClick={() => onViewProfile(tutor)}
                            >
                                View
                            </button>
                        </>
                    ) : user ? (
                        <>
                            <button
                                className="btn btn-primary rounded-full flex-1"
                                onClick={() => onViewProfile(tutor)}
                            >
                                View Profile
                            </button>
                            <button
                                className="btn btn-outline btn-sm rounded-full"
                                onClick={() => onMessage(tutor)}
                            >
                                Message
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                className="btn btn-primary rounded-full flex-1"
                                onClick={() => onLoginToApply()}
                            >
                                Login to apply
                            </button>
                            <button
                                className="btn btn-outline btn-sm rounded-full"
                                onClick={() => onLoginToApply()}
                            >
                                Register
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TutorCard;
