import React, { useCallback, useState } from 'react';

const FileUploadSection = ({ onFilesSelected }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const preventDefaults = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragEnter = useCallback((e) => {
    preventDefaults(e);
    setIsDragging(true);
  }, [preventDefaults]);

  const handleDragLeave = useCallback((e) => {
    preventDefaults(e);
    setIsDragging(false);
  }, [preventDefaults]);

  const handleDragOver = useCallback((e) => {
    preventDefaults(e);
    setIsDragging(true);
  }, [preventDefaults]);

  const handleDrop = useCallback((e) => {
    preventDefaults(e);
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, [preventDefaults]);

  const handleFiles = useCallback((filesInput) => {
    const files = Array.from(filesInput instanceof FileList ? filesInput : filesInput);
    const validFiles = files.filter(file =>
      ['.xls', '.xlsx', '.csv'].some(ext => file.name.toLowerCase().endsWith(ext))
    );

    if (validFiles.length === 0) {
      alert('Please select valid Excel or CSV files');
      return;
    }

    setSelectedFiles(validFiles);
    onFilesSelected(validFiles);
  }, [onFilesSelected]);

  const FileIcon = ({ fileName }) => {
    if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
      return (
        <svg style={{ width: 32, height: 32, color: 'green' }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    }
    return (
      <svg style={{ width: 32, height: 32, color: 'blue' }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  };

  return (
    <div
      style={{
        position: 'relative',
        border: '2px dashed #4F46E5',
        padding: '8px',
        textAlign: 'center',
        marginBottom: '24px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        backgroundColor: isDragging ? '#E0E7FF' : 'transparent',
        borderColor: isDragging ? '#4338CA' : '#4F46E5',
      }}
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={() => document.getElementById('fileInput').click()}
    >
      <input
        type="file"
        id="fileInput"
        accept=".xls,.xlsx,.csv"
        style={{ display: 'none' }}
        onChange={(e) => handleFiles(e.target.files)}
      />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <svg xmlns="http://www.w3.org/2000/svg" style={{ width: 48, height: 48, color: '#4F46E5', marginBottom: '16px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p style={{ color: '#4B5563' }}>
          Drag & Drop Excel files here or <span style={{ color: '#4F46E5', fontWeight: 'bold' }}>Browse</span>
        </p>
        <p style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '8px' }}>Supports .xls, .xlsx, .csv</p>

        {selectedFiles.length > 0 && (
          <div style={{ marginTop: '24px', width: '100%', maxWidth: '512px' }}>
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  padding: '12px',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #E0E7FF',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <FileIcon fileName={file.name} />
                <div style={{ marginLeft: '12px', flex: 1 }}>
                  <p style={{ fontSize: '14px', fontWeight: '500', color: '#1F2937', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {file.name}
                  </p>
                  <p style={{ fontSize: '12px', color: '#6B7280' }}>
                    {formatFileSize(file.size)}
                  </p>
                </div>
                <span style={{
                  padding: '4px 8px',
                  fontSize: '12px',
                  fontWeight: '500',
                  color: '#1B5A3C',
                  backgroundColor: '#D1F2E8',
                  borderRadius: '9999px',
                }}>
                  Ready
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploadSection;
