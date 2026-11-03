import { useState } from "react";
import useFetchPost from "../hooks/useFetchPost";

const initialForm = {
  topic: "",
  description: "",
  tags: "",
  images: "",
  type: "",
  issue: "",
};

const splitCommaSeparatedValues = (value) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const NewEncounter = () => {
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { post } = useFetchPost();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess(false);

    const encounter = {
      topic: form.topic.trim(),
      description: form.description.trim(),
      tagString: form.tags.trim(),
      imgString: form.images.trim(),
      type: form.type.trim(),
      issue: form.issue.trim(),
    };
    console.log(encounter.tag);
    const url = "/encounter";
    try {
      await post(url, encounter);
      setForm(initialForm);
      setSuccess(true);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Could not create encounter",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="new-encounter">
      <h1>Create encounter</h1>
      <form className="new-encounter-form" onSubmit={handleSubmit}>
        <label htmlFor="encounter-topic">
          Topic
          <input
            id="encounter-topic"
            name="topic"
            value={form.topic}
            onChange={handleChange}
            required
            maxLength={120}
          />
        </label>
        <label htmlFor="encounter-type">
          Type:
          <select
            id="encounter-type"
            name="type"
            value={form.type}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select type</option>
            <option value="uncertain">Uncertain</option>
            <option value="certain">Certain</option>
          </select>
        </label>

        <label htmlFor="encounter-issue">
          Issue:
          <select
            id="encounter-issue"
            name="issue"
            value={form.issue}
            onChange={handleChange}
          >
            <option value="">None</option>
            <option value="AI-slop">AI-slop</option>
            <option value="scam">scam</option>
            <option value="advertisement">advertisement</option>
          </select>
        </label>

        <label htmlFor="encounter-description">
          Description
          <textarea
            id="encounter-description"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows={5}
          />
        </label>

        <label htmlFor="encounter-tags">
          Tags
          <input
            id="encounter-tags"
            name="tags"
            value={form.tags}
            onChange={handleChange}
            placeholder="Separate tags with commas"
          />
        </label>

        <label htmlFor="encounter-images">
          Image URLs
          <input
            id="encounter-images"
            name="images"
            value={form.images}
            onChange={handleChange}
            placeholder="Separate URLs with commas"
          />
        </label>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create encounter"}
        </button>
        {error && <p className="new-encounter-error" role="alert">{error}</p>}
        {success && (
          <p className="new-encounter-success" role="status">
            Encounter created successfully.
          </p>
        )}
      </form>
    </main>
  );
};

export default NewEncounter;