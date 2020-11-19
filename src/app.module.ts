import { CacheModule, Module, HttpModule } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ScheduleModule } from '@nestjs/schedule'

import { CacheService, GraphqlService, PrismaService } from './config'
import { AppController } from './app.controller'
import { AppService } from './app.service'

import { DateScalar } from './config/graphql/scalars/date.scalar'
import { UploadScalar } from './config/graphql/scalars/upload.scalar'

import * as Resolvers from './resolvers'

@Module({
	imports: [
		ScheduleModule.forRoot(),
		GraphQLModule.forRootAsync({
			useClass: GraphqlService
		}),
		CacheModule.registerAsync({
			useClass: CacheService
		}),
		HttpModule
	],
	controllers: [AppController],
	providers: [
		DateScalar,
		UploadScalar,
		...Object.values(Resolvers),
		AppService,
		PrismaService
	]
})
export class AppModule {}
