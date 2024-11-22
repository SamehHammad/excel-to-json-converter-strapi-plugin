
const JsonOutputSection = ({ jsonOutput, onCopy, showToast }) => {
  return (
    <>
      <div
        style={{
          backgroundColor: '#f9fafb',
          border: '1px solid #e5e7eb',
          borderRadius: '0.5rem',
        }}
      >
        <pre
          style={{
            padding: '1rem',
            fontSize: '0.875rem',
            color: '#374151',
            fontFamily: 'monospace',
            overflow: 'auto',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            maxHeight: '500px',
            scrollbarWidth: 'thin',
            scrollbarColor: '#6366f1 #e0e7ff',
          }}
        >
          {jsonOutput}
        </pre>
      </div>

      {/* Toast Notification */}
      <div
        style={{
          position: 'absolute',
          top: '60%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          transition: 'all 300ms ease-in-out',
          zIndex: 50,
          opacity: showToast ? 1 : 0,
          transform: showToast ? 'scale(1)' : 'scale(0.9)',
        }}
      >
        <div
          style={{
            backgroundColor: '#10b981',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{
              height: '1.5rem',
              width: '1.5rem',
              marginRight: '0.5rem',
            }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>JSON copied successfully!</span>
        </div>
      </div>
    </>
  );
};

export default JsonOutputSection;
