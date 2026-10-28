import { Kafka, KafkaMessage } from 'kafkajs';

export class KafkaConsumer {
  private kafka!: Kafka;

  constructor() {
    const clientId = process.env.KAFKA_CLIENT_ID || 'default-client';
    const brokerAddress = process.env.KAFKA_BROKER_ADDRESS || 'localhost:9094';

    this.kafka = new Kafka({
      clientId,
      brokers: [brokerAddress],
    });
  }

  async subscribe<T = any>(
    topic: string,
    callback: (message: T) => void | Promise<void>,
  ): Promise<void> {
    // The topic may not exist yet on a fresh broker (the producer creates it on first emit),
    // and subscribing to a missing topic crashes the consumer.
    const admin = this.kafka.admin();
    await admin.connect();
    await admin.createTopics({ topics: [{ topic }], waitForLeaders: true });
    await admin.disconnect();

    const consumer = this.kafka.consumer({ groupId: 'group-name' });
    await consumer.connect();
    await consumer.subscribe({ topic });
    await consumer.run({
      eachMessage: async ({ message }: { message: KafkaMessage }) => {
        const parsedMessage: T = JSON.parse(
          (message.value || '{}').toString(),
        ) as T;
        await callback(parsedMessage);
      },
    });
  }
}
