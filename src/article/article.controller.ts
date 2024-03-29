import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus, UseGuards, Res } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUseTags,
  ApiBearerAuth,
  ApiImplicitHeader,
  ApiOperation,
  ApiImplicitParam,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from './../auth/decorators/roles.decorator';

@ApiUseTags('Article')
@Controller('article')
@UseGuards(RolesGuard)
export class ArticleController {
  constructor(
    private readonly articleService: ArticleService,
  ) {
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ title: 'Get All article' })
  @ApiOkResponse({})
  async getAllArticle(@Res() res: any) {
    const response = await this.articleService.getAllArticles();
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      response,
    });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ title: 'Get One article' })
  @ApiImplicitParam({ name: 'id', description: 'id of article' })
  @ApiOkResponse({})
  async getOneArticle(@Param() params, @Res() res: any) {
    const response = await this.articleService.getOneArticle(params.id);
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      response,
    });
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard('jwt'))
  // @Roles('admin')
  @ApiOperation({ title: 'Create one article' })
  @ApiBearerAuth()
  @ApiImplicitHeader({
    name: 'x-token',
    description: 'the token we need for auth.',
  })
  @ApiCreatedResponse({})
  async createArticle(@Body() createArticleDto: CreateArticleDto, @Res() res: any) {
    const response = await this.articleService.createArticle(createArticleDto);
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      response,
    });
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  // @Roles('admin')
  @ApiOperation({ title: 'Update one article by id ( all params )' })
  @ApiBearerAuth()
  @ApiImplicitParam({ name: 'id', description: 'id of article' })
  @ApiImplicitHeader({
    name: 'x-token',
    description: 'the token we need for auth.',
  })
  @ApiOkResponse({})
  async updateWithAllParams(@Param() params, @Body() createArticleDto: CreateArticleDto, @Res() res: any) {
    const response = await this.articleService.updateArticlePut(params.id, createArticleDto);
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      response,
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  // @Roles('admin')
  @ApiOperation({ title: 'Delete one article' })
  @ApiBearerAuth()
  @ApiImplicitHeader({
    name: 'x-token',
    description: 'the token we need for auth.',
  })
  @ApiImplicitParam({ name: 'id', description: 'id of article we want to delete.' })
  @ApiOkResponse({})
  async deleteOneArticle(@Param() params) {
    const response = await this.articleService.deleteArticle(params.id);
    return {
      statusCode: 200,
      response,
    };
  }
}
