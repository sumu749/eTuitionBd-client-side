import api from "../api/api";

// ─── Helpers ────────────────────────────────────────────────────────────────

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
            bookmarkId: b._id,
        }));

    const tuitions = data
        .filter((b) => b.type === "tuition")
        .map((b) => ({
            ...b.item,
            bookmarkId: b._id,
        }));

    return { tutors, tuitions };
};

// ─── Public API ─────────────────────────────────────────────────────────────

export const getSavedBookmarks = async (email) => {
    if (!email) return { tutors: [], tuitions: [] };

    const res = await api.get("/bookmarks", { params: { email } });
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

    const payload = { email, type, item: normalized };
    if (type === "tuition") {
        payload.tuitionId = itemId;
    } else {
        // For tutors, the backend's unique index is on (tuitionId, tutorEmail).
        // We store the tutor's own ID as tuitionId so the index works uniformly.
        payload.tuitionId = itemId;
        payload.id = itemId;
    }

    await api.post("/bookmarks", payload);
};

/**
 * removeBookmark — deletes a bookmark by its MongoDB _id.
 * @param {string} bookmarkId  The _id from the bookmarks collection.
 */
export const removeBookmark = async (bookmarkId) => {
    if (!bookmarkId) return;
    await api.delete("/bookmarks", { params: { id: bookmarkId } });
};

/**
 * toggleBookmark — adds or removes a bookmark for an item.
 * Returns true if the item is now bookmarked, false if it was removed.
 *
 * BUG FIX: The previous version called `removeBookmark(type, id, email)` but
 * removeBookmark only accepts a single bookmarkId argument.  We now fetch the
 * current bookmarks first, find the matching bookmarkId, and pass that.
 */
export const toggleBookmark = async (type, item, email) => {
    if (!email || !item) return false;

    const id = getItemId(item);
    if (!id) return false;

    // Fetch current state so we have the real bookmarkId for deletion
    const current = await getSavedBookmarks(email);
    const list = type === "tutor" ? current.tutors : current.tuitions;
    const existing = list.find((b) => b.id === id);

    if (existing) {
        // bookmarkId is the MongoDB _id stored by normalizeBookmarkResponse
        await removeBookmark(existing.bookmarkId);
        return false;
    }

    await addBookmark(type, item, email);
    return true;
};
