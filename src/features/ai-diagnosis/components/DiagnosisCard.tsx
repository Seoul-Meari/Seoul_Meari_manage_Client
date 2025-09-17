import React from 'react';
import { Link } from 'react-router-dom';

type Status = '대기' | '검토됨' | '해결됨';
type Severity = '보통' | '낮음' | '높음';

interface DiagnosisCardProps {
  title: string;
  description: string;
  timestamp: string;
  location: string;
  confidence: number;
  status: Status;
  severity: Severity;
}

const getStatusColor = (status: Status, severity: Severity) => {
  if (status === '해결됨') return { bg: 'bg-green-50', border: 'border-green-300', text: 'text-green-800' };
  if (status === '검토됨') return { bg: 'bg-blue-50', border: 'border-blue-300', text: 'text-blue-800' };
  
  // '대기' 상태일 경우 심각도에 따라 색상 결정
  switch (severity) {
    case '높음':
      return { bg: 'bg-red-50', border: 'border-red-300', text: 'text-red-800' };
    case '보통':
      return { bg: 'bg-yellow-50', border: 'border-yellow-300', text: 'text-yellow-800' };
    case '낮음':
    default:
      return { bg: 'bg-gray-50', border: 'border-gray-300', text: 'text-gray-800' };
  }
};

const Tag: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <span className={`px-2 py-1 text-xs font-medium rounded-full ${className}`}>
    {children}
  </span>
);

const DiagnosisCard: React.FC<DiagnosisCardProps> = (props) => {
  const { title, description, timestamp, location, confidence, status, severity } = props;
  const colors = getStatusColor(status, severity);

  return (
    <div className={`p-5 rounded-lg border ${colors.bg} ${colors.border}`}>
      {/* Card Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-3">
          <span className={`${colors.text}`}><AlertIcon severity={severity} status={status} /></span>
          <h4 className={`text-md font-bold ${colors.text}`}>{title}</h4>
        </div>
        <div className="flex space-x-2">
          <Tag className="bg-white border border-gray-200 text-gray-600">{status}</Tag>
          <Tag className="bg-white border border-gray-200 text-gray-600">{severity}</Tag>
        </div>
      </div>

      {/* Card Body */}
      <div className="mt-3 pl-9">
        <p className="text-sm text-gray-700">{description}</p>
        <div className="mt-3 flex items-center space-x-4 text-xs text-gray-500">
          <span>🕒 {timestamp}</span>
          <span>📍 {location}</span>
        </div>
        <div className="mt-1 text-xs text-gray-500">
          <span>신뢰도: {confidence}%</span>
        </div>
      </div>
      
      {/* Card Footer */}
      <div className="mt-4 pl-9 flex items-center space-x-2">
        <Link to={`/ai-diagnosis/${Math.floor(Math.random() * 100)}`} className="px-4 py-2 text-sm font-semibold bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center">
          <EyeIcon /> <span className="ml-2">상세보기</span>
        </Link>
        <button className="px-4 py-2 text-sm font-semibold text-white bg-teal-500 rounded-md hover:bg-teal-600 flex items-center">
          <CheckIcon /> <span className="ml-2">해결완료</span>
        </button>
      </div>
    </div>
  );
};

const AlertIcon: React.FC<{ severity: Severity; status: Status }> = ({ severity, status }) => {
    if (status === '해결됨') return <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
    if (severity === '높음') return <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;
    return <svg xmlns="http://www.w.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
}

const EyeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>;
const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>;

export default DiagnosisCard;
