import { useState } from 'react';
import ReportChart from './report-chart/ReportChart';
import ReportFilterHeader from './report-filter-header';
import SelectDateRangeModal from './select-date-range-modal/SelectDateRangeModal';

const ReportPage = () => {
  const [showDateRangeModal, setShowDateRangeModal] = useState(false);

  return (
    <div>
      <ReportFilterHeader onClick={() => setShowDateRangeModal(true)} />
      <ReportChart />
      <SelectDateRangeModal
        show={showDateRangeModal}
        onClose={() => setShowDateRangeModal(false)}
      />
    </div>
  );
};

export default ReportPage;
