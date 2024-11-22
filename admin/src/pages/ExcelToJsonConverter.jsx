import React, { useState, useCallback } from 'react';
import * as XLSX from 'xlsx';
import FileUploadSection from './FileUploadSection';
import JsonOutputSection from './JsonOutputSection';
import mhg from './MHG-logo.svg';
const ExcelToJsonConverter = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [jsonOutput, setJsonOutput] = useState('No JSON data yet. Upload an Excel file to convert.');
  const [showToast, setShowToast] = useState(false);

  const generateUniqueId = useCallback(() => {
    return Math.floor(Math.random() * 1000000);
  }, []);

  const generateDocumentId = useCallback(() => {
    return Math.random().toString(36).substr(2, 9);
  }, []);

  const processExcelData = useCallback((data, outputData) => {
    data.forEach((item) => {
      const productId = item.id || generateUniqueId();

      outputData["api::product.product"][productId] = {
        "id": parseInt(item.id, 10) || productId,
        "documentId": item.documentId || generateDocumentId(),
        "title": item.title || '',
        "createdAt": new Date().toISOString(),
        "updatedAt": new Date().toISOString(),
        "publishedAt": item.publishedAt || null,
        "locale": item.locale || 'en',
        "SKU": item.SKU ? item.SKU.toString() : '',
        "price": parseInt(item.price, 10) || 0,
        "Types": item.Types || '',
        "video_url": item.video_url || '',
        "description": item.description || '',
        "slug": item.slug || '',
        "short_description": item.short_description || '',
        "stock": item.stock === "TRUE" || item.stock === true,
        "buildstation_url": item.buildstation_url || null,
        "isFeature": item.isFeature || null,
        "images": item.images || null,
        "main_image": item.main_image || null,
        "colors": Array.isArray(item.colors) ? item.colors : typeof item.colors === 'string' ? item.colors.split(',').map(Number) : [],
        "sub_categories": Array.isArray(item.sub_categories) ? item.sub_categories : typeof item.sub_categories === 'string' ? item.sub_categories.split(',').map(Number) : [],
        "capacity": Array.isArray(item.capacity) ? item.capacity : typeof item.capacity === 'string' ? item.capacity.split(',').map(Number) : [],
        "size": Array.isArray(item.size) ? item.size : typeof item.size === 'string' ? item.size.split(',').map(Number) : [],
        "SEO": parseInt(item.SEO, 10) || null,
        "main_category": item.main_category || null,
        "attributes_family": item.attributes_family || null,
        "related_prodcuts": Array.isArray(item.related_prodcuts) ? item.related_prodcuts : [],
        "products": item.products || null,
        "bought_together": Array.isArray(item.bought_together) ? item.bought_together : [],
        "productss": Array.isArray(item.productss) ? item.productss : [],
        "localizations": Array.isArray(item.localizations) ? item.localizations : typeof item.localizations === 'string' ? item.localizations.split(',').map(Number) : [],
        "createdBy": item.createdBy || null,
        "updatedBy": item.updatedBy || null
      };
    });
  }, [generateDocumentId, generateUniqueId]);

  const handleConvert = useCallback(() => {
    if (selectedFiles.length === 0) {
      alert('Please select an Excel file first');
      return;
    }

    const allSheets = {
      "version": 2,
      "data": {
        "api::product.product": {}
      }
    };

    selectedFiles.forEach(file => {
      const fileReader = new FileReader();
      fileReader.readAsBinaryString(file);
      fileReader.onload = (event) => {
        const data = event.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const rowObjects = XLSX.utils.sheet_to_row_object_array(worksheet);

        processExcelData(rowObjects, allSheets.data);
        setJsonOutput(JSON.stringify(allSheets, null, 2));
      };
    });
  }, [selectedFiles, processExcelData]);

  const handleCopy = useCallback(() => {
    if (jsonOutput !== 'No JSON data yet. Upload an Excel file to convert.') {
      navigator.clipboard.writeText(jsonOutput).then(() => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      });
    }
  }, [jsonOutput]);

  const handleFilesSelected = useCallback((files) => {
    setSelectedFiles(files);
  }, []);

  return (
    <div style={{
      backgroundColor: '#F3F4F6',
      minHeight: '100vh'
    }}>
      <div style={{
        container: true,
        margin: '0 auto',
        padding: '2rem 1rem'
      }}>
        <div style={{
          maxWidth: '70%',
          margin: '0 auto',
          backgroundColor: 'white',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          borderRadius: '1rem',
          overflow: 'hidden'
        }}>
          <div style={{
            backgroundColor: '#006EB6',
            padding: '1.5rem',
            display: 'flex',
            justifyContent: 'center',
            gap: '0.75rem',
            alignItems: 'center'
          }}>
            <img
              src={mhg}
              style={{
                border: '1px solid white',
                width: '3.5rem',
                height: '3.5rem'
              }}
            />
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center'
            }}>
              Excel to JSON Converter
            </h2>
          </div>

          <div style={{
            padding: '1.5rem'
          }}>
            <FileUploadSection onFilesSelected={handleFilesSelected} />

            <div style={{
              display: 'flex',
              gap: '1rem',
              marginBottom: '1.5rem',
            }}>
              <button
                onClick={handleConvert}
                style={{
                  flex: 1,
                  backgroundColor: '#22C55E',
                  color: 'white',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  ':hover': {
                    backgroundColor: '#16A34A',
                    transform: 'scale(1.05)',
                  }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" style={{height: '1.5rem', width: '1.5rem', marginRight: '0.5rem'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Convert to JSON
              </button>
              <button
                onClick={handleCopy}
                style={{
                  flex: 1,
                  backgroundColor: '#3B82F6',
                  color: 'white',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  ':hover': {
                    backgroundColor: '#2563EB',
                    transform: 'scale(1.05)',
                  }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" style={{height: '1.5rem', width: '1.5rem', marginRight: '0.5rem'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy JSON
              </button>
            </div>

            <JsonOutputSection
              jsonOutput={jsonOutput}
              onCopy={handleCopy}
              showToast={showToast}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExcelToJsonConverter;
