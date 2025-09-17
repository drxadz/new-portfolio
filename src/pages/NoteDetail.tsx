import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function NoteDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      // Redirect to the new notes layout with the note parameter
      navigate(`/notes?note=${slug}`, { replace: true });
    } else {
      navigate('/notes', { replace: true });
    }
  }, [slug, navigate]);

  return null;
}
