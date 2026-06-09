import api from "../api/api";

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

const normalizeBookmarkResponse = (data) => ({
    tutors: Array.isArray(data?.tutors) ? data.tutors : [],
    tuitions: Array.isArray(data?.tuitions) ? data.tuitions : [],
});

export const getSavedBookmarks = async (email) => {
    if (!email) return { tutors: [], tuitions: [] };

    const res = await api.get("/bookmarks", {
        params: { email },
    });

    return normalizeBookmarkResponse(res.data);
};

export const getSavedIds = async (type, email) => {
    const bookmarks = await getSavedBookmarks(email);
    return (bookmarks[type === "tutor" ? "tutors" : "tuitions"] || []).map(
        (item) => item.id,
    );
};

export const isBookmarked = async (type, id, email) => {
    if (!id || !email) return false;

    const ids = await getSavedIds(type, email);
    return ids.includes(id);
};

export const addBookmark = async (type, item, email) => {
    if (!email || !item) return;

    const normalized =
        type === "tutor" ? normalizeTutor(item) : normalizeTuition(item);

    await api.post("/bookmarks", {
        email,
        type,
        item: normalized,
    });
};

export const removeBookmark = async (type, id, email) => {
    if (!id || !email) return;

    await api.delete("/bookmarks", {
        data: {
            email,
            type,
            id,
        },
    });
};

export const toggleBookmark = async (type, item, email) => {
    if (!email || !item) return false;

    const id = getItemId(item);
    if (!id) return false;

    const bookmarked = await isBookmarked(type, id, email);
    if (bookmarked) {
        await removeBookmark(type, id, email);
        return false;
    }

    await addBookmark(type, item, email);
    return true;
};
