import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
	getServerMessage(): string {
		return 'Thank you for spending some time on this test. All the best 🙌';
	}
}
