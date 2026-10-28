import { Kafka } from 'kafkajs';

export class KafkaProducer {
  private kafka!: Kafka;

  constructor() {
    const clientId = process.env.KAFKA_CLIENT_ID || 'default-client';
    const brokerAddress = process.env.KAFKA_BROKER_ADDRESS || 'localhost:9094';
    this.kafka = new Kafka({
      clientId,
      brokers: [brokerAddress],
    });
  }

  async emit<T = any>(topic: string, message: T) {
    const producer = this.kafka.producer();
    await producer.connect();
    await producer.send({
      topic,
      messages: [
        {
          value: JSON.stringify(message),
        },
      ],
    });
    await producer.disconnect();
  }
}
