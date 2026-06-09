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

const normalizeBookmarkResponse = (data) => {
    if (!Array.isArray(data)) {
        return { tutors: [], tuitions: [] };
    }

    const tutors = data
        .filter((b) => b.type === "tutor")
        .map((b) => ({
            ...b.item,
            bookmarkId: b._id, // Add MongoDB bookmark ID
        }));
    const tuitions = data
        .filter((b) => b.type === "tuition")
        .map((b) => ({
            ...b.item,
            bookmarkId: b._id, // Add MongoDB bookmark ID
        }));

    return { tutors, tuitions };
};

export const getSavedBookmarks = async (email) => {
    if (!email) return { tutors: [], tuitions: [] };

    const res = await api.get("/bookmarks", {
        params: { email },
    });

    console.log("[DEBUG] getSavedBookmarks response:", res.data);
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
    const itemId = getItemId(item);

    if (!itemId) return;

    const payload = {
        email,
        type,
        item: normalized,
    };

    if (type === "tuition") {
        payload.tuitionId = itemId;
    } else {
        payload.id = itemId;
    }

    console.log("[DEBUG] addBookmark payload:", payload);
    const res = await api.post("/bookmarks", payload);
    console.log("[DEBUG] addBookmark response:", res.data);
};

export const removeBookmark = async (bookmarkId) => {
    if (!bookmarkId) return;

    console.log("[DEBUG] removeBookmark - deleting bookmark:", bookmarkId);
    const res = await api.delete("/bookmarks", {
        params: {
            id: bookmarkId,
        },
    });
    console.log("[DEBUG] removeBookmark response:", res.data);
};

export const toggleBookmark = async (type, item, email) => {
    if (!email || !item) return false;

    const id = getItemId(item);
    if (!id) return false;

    console.log("[DEBUG] toggleBookmark - checking if bookmarked:", {
        type,
        id,
        email,
    });
    const bookmarked = await isBookmarked(type, id, email);
    console.log(
        "[DEBUG] toggleBookmark - is currently bookmarked:",
        bookmarked,
    );

    if (bookmarked) {
        console.log("[DEBUG] toggleBookmark - removing bookmark");
        await removeBookmark(type, id, email);
        return false;
    }

    console.log("[DEBUG] toggleBookmark - adding bookmark");
    await addBookmark(type, item, email);
    return true;
};
