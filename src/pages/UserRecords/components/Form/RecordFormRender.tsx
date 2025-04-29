import { Form, Input, DatePicker, Select, Checkbox } from 'antd';

// types
import { FIELD_CONFIGS } from '../../types/record.d';

interface RecordFormRenderProps {
    field: (typeof FIELD_CONFIGS)[number];
}

const RecordFormRender = ({ field }: RecordFormRenderProps) => {
    const { type, label, dataIndex, required, options } = field;

    const requiredRules = required ? [{ required: true, message: `${label}을(를) 입력해주세요` }] : [];

    switch (type) {
        case 'text':
            return (
                <Form.Item
                    key={dataIndex}
                    label={label}
                    name={dataIndex}
                    rules={[...requiredRules, { max: 20, message: '20자 이내로 입력해주세요.' }]}
                >
                    <Input placeholder={`${label}을(를) 입력하세요`} />
                </Form.Item>
            );
        case 'textarea':
            return (
                <Form.Item
                    key={dataIndex}
                    label={label}
                    name={dataIndex}
                    rules={[...requiredRules, { max: 50, message: '50자 이내로 입력해주세요.' }]}
                >
                    <Input.TextArea placeholder={`${label}을(를) 입력하세요`} />
                </Form.Item>
            );
        case 'date':
            return (
                <Form.Item key={dataIndex} label={label} name={dataIndex} rules={requiredRules}>
                    <DatePicker
                        placeholder={`${label}을(를) 선택하세요`}
                        style={{ width: '100%' }}
                        format="YYYY-MM-DD"
                    />
                </Form.Item>
            );
        case 'select':
            return (
                <Form.Item key={dataIndex} label={label} name={dataIndex} rules={requiredRules}>
                    <Select
                        placeholder={`${label}을(를) 선택하세요`}
                        options={options?.map((option) => ({ value: option, label: option }))}
                    />
                </Form.Item>
            );
        case 'checkbox':
            return (
                <Form.Item
                    key={dataIndex}
                    label={label}
                    name={dataIndex}
                    valuePropName="checked"
                    rules={requiredRules}
                    initialValue={false}
                >
                    <Checkbox />
                </Form.Item>
            );
        default:
            return null;
    }
};

export default RecordFormRender;
