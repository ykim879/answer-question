import { useEffect, useRef, useState } from 'react';

function ContentBlock() {
  const [contentBlocks, setContentBlocks] = useState([]);
  const observerRef = useRef(null);
  const targetRef = useRef(null);

  useEffect(() => {
    // Create a new IntersectionObserver with a callback function
    const observer = new IntersectionObserver((entries) => {
      console.log(entries)
      const target = entries[0];

      if (target.isIntersecting) {
        // Load additional content blocks when the target element is intersecting
        loadContentBlocks();
      }
    }, { threshold: 0 });

    // Set the observer reference
    observerRef.current = observer;

    // Observe the target element
    if (targetRef.current) {
      observerRef.current.observe(targetRef.current);
    }

    // Cleanup the observer when the component is unmounted
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const loadContentBlocks = () => {
    // Simulate loading additional content blocks
    // Replace this with your actual logic to load content blocks
    const additionalBlocks = [...Array(15)].map((_, index) => ({
      id: contentBlocks.length + index + 1,
      text: `Content Block ${contentBlocks.length + index + 1}`
    }));

    setContentBlocks((prevBlocks) => [...prevBlocks, ...additionalBlocks]);
  };

  return (
    <div>
      <h1>Content Blocks</h1>
      {contentBlocks.map((block) => (
        <div key={block.id}>
          <p>{block.text}</p>
        </div>
      ))}
      <div ref={targetRef} />
    </div>
  );
}

export default ContentBlock;
