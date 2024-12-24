import { useState } from "react";
import { toast } from "react-toastify";

function ReviewForm({ productId }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to leave a review.");
      return;
    }

    const reviewData = {
      userName: name,
      email,
      text: review,
      rating, // Include the selected rating
    };

    try {
      setLoading(true);
      const response = await fetch(
        `https://furnitureapi-ykrq.onrender.com/api/furniture/${productId}/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(reviewData),
        }
      );

      if (!response.ok) throw new Error("Failed to submit review");

      toast.success("Review submitted successfully!");
      setName("");
      setEmail("");
      setReview("");
      setRating(0);
    } catch (error) {
      toast.error("Error submitting review.");
    } finally {
      setLoading(false);
    }
  };

  const handleStarClick = (index) => {
    const selectedRating = index + 1;
    setRating(selectedRating); 
    console.log("Selected Rating:", selectedRating);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        className="w-full p-2 border rounded"
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className="w-full p-2 border rounded"
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <textarea
        className="w-full p-2 border rounded"
        rows="4"
        placeholder="Your Review"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        required
      ></textarea>

      {/* Star Rating */}
      <div className="flex space-x-1 text-2xl">
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            onClick={() => handleStarClick(index)}
            className={`cursor-pointer ${
              index < rating ? "text-amber-400" : "text-gray-400"
            }`}
          >
            ★
          </span>
        ))}
      </div>

      <button
        className={`px-4 py-2 bg-green-950 text-white rounded ${
          loading ? "opacity-50" : ""
        }`}
        type="submit"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}

export default ReviewForm;
