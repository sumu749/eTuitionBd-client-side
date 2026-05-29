const STORAGE_KEY_PREFIX = "eTuitionBd_bookmarks_";

const getStorageKey = (email) =>
    `${STORAGE_KEY_PREFIX}${email?.toLowerCase() || "guest"}`;

const getItemId = (item) =>
    item?._id || item?.id || item?.tutorId || item?.tuitionId || "";

const normalizeTutor = (tutor) => ({
    id: getItemId(tutor),
    name: tutor.name,
    email: tutor.email,
    subject: tutor.subject,
    university: tutor.university,
    photoURL:
        tutor.photoURL || tutor.image || "https://i.pravatar.cc/300?img=65",
    location: tutor.location,
    bio: tutor.bio,
});

const normalizeTuition = (tuition) => ({
    id: getItemId(tuition),
    subject: tuition.subject,
    classLevel: tuition.classLevel,
    location: tuition.location,
    budget: tuition.budget,
    description: tuition.description,
    status: tuition.status,
});

const readBookmarks = (email) => {
    if (!email || typeof window === "undefined") {
        return { tutors: [], tuitions: [] };
    }

    try {
        const saved = window.localStorage.getItem(getStorageKey(email));
        return saved ? JSON.parse(saved) : { tutors: [], tuitions: [] };
    } catch (error) {
        console.error("Failed to read bookmarks:", error);
        return { tutors: [], tuitions: [] };
    }
};

const writeBookmarks = (email, bookmarks) => {
    if (!email || typeof window === "undefined") return;

    try {
        window.localStorage.setItem(
            getStorageKey(email),
            JSON.stringify(bookmarks),
        );
    } catch (error) {
        console.error("Failed to save bookmarks:", error);
    }
};

export const getSavedBookmarks = (email) => readBookmarks(email);

export const getSavedIds = (type, email) => {
    const bookmarks = readBookmarks(email);
    return (bookmarks[type === "tutor" ? "tutors" : "tuitions"] || []).map(
        (item) => item.id,
    );
};

export const isBookmarked = (type, id, email) => {
    if (!id || !email) return false;
    const ids = getSavedIds(type, email);
    return ids.includes(id);
};

export const addBookmark = (type, item, email) => {
    if (!email || !item) return;

    const bookmarks = readBookmarks(email);
    const listKey = type === "tutor" ? "tutors" : "tuitions";
    const existingIds = bookmarks[listKey].map((bookmark) => bookmark.id);
    const id = getItemId(item);

    if (!id || existingIds.includes(id)) return;

    const normalized =
        type === "tutor" ? normalizeTutor(item) : normalizeTuition(item);
    bookmarks[listKey] = [normalized, ...bookmarks[listKey]];
    writeBookmarks(email, bookmarks);
};

export const removeBookmark = (type, id, email) => {
    if (!id || !email) return;

    const bookmarks = readBookmarks(email);
    const listKey = type === "tutor" ? "tutors" : "tuitions";

    bookmarks[listKey] = bookmarks[listKey].filter((item) => item.id !== id);
    writeBookmarks(email, bookmarks);
};

export const toggleBookmark = (type, item, email) => {
    if (!email || !item) return false;

    const id = getItemId(item);
    if (!id) return false;

    if (isBookmarked(type, id, email)) {
        removeBookmark(type, id, email);
        return false;
    }

    addBookmark(type, item, email);
    return true;
};
