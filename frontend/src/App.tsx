import { useState } from "react";
import { Alert, Button, Card, Form, Input, Typography, message } from "antd";

const apiBase = import.meta.env.VITE_API_BASE ?? "http://localhost:8080";

type FormValues = { fullName: string; email: string; phone?: string };

type ApiResponse = {
  id: number;
  fullName: string;
  email: string;
  phone: string | null;
  createdAt: string;
};

export default function App() {
  const [form] = Form.useForm<FormValues>();
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState<ApiResponse | null>(null);

  const onFinish = async (v: FormValues) => {
    setLoading(true);
    setSaved(null);
    try {
      const res = await fetch(`${apiBase}/api/registrations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: v.fullName,
          email: v.email,
          phone: v.phone?.trim() || undefined,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data: ApiResponse = await res.json();
      setSaved(data);
      message.success("Saved");
      form.resetFields();
    } catch (e) {
      message.error(e instanceof Error ? e.message : "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 440, margin: "40px auto", padding: 16 }}>
      <Typography.Title level={4}>Register</Typography.Title>
      <Card>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item name="fullName" label="Name" rules={[{ required: true }]}>
            <Input maxLength={200} />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true }, { type: "email" }]}
          >
            <Input maxLength={320} />
          </Form.Item>
          <Form.Item name="phone" label="Phone">
            <Input maxLength={50} />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Submit
          </Button>
        </Form>
      </Card>
      {saved && (
        <Alert
          style={{ marginTop: 16 }}
          type="success"
          message={`Saved · id ${saved.id} · ${new Date(saved.createdAt).toLocaleString()}`}
        />
      )}
    </div>
  );
}
